#!/usr/bin/env bash

# Execute a Clerk Backend API request with scope enforcement.
#
# Usage: bash execute-request.sh [--admin] <METHOD> <PATH> [BODY]
#
# Scope enforcement:
#   GET     — always allowed
#   POST, PUT, PATCH — requires CLERK_BAPI_SCOPES="write" or --admin flag
#   DELETE  — requires CLERK_BAPI_SCOPES="write,delete" or --admin flag

set -euo pipefail

# Walk up from $PWD to find .env/.env.local (mirrors Clerk CLI behavior).
# Stops at the first directory that provides CLERK_SECRET_KEY.
#
# Dotenv files are parsed for a literal CLERK_SECRET_KEY=... assignment
# only — never sourced/executed — so a repository-controlled .env can't
# run arbitrary shell code.
_dir="$PWD"
while true; do
  for _envfile in "$_dir/.env" "$_dir/.env.local"; do
    if [[ -f "$_envfile" ]] && [[ -z "${CLERK_SECRET_KEY:-}" ]]; then
      _line="$(grep -m1 -E '^[[:space:]]*CLERK_SECRET_KEY[[:space:]]*=' "$_envfile" || true)"
      if [[ -n "$_line" ]]; then
        _value="${_line#*=}"
        _value="${_value%\"}"
        _value="${_value#\"}"
        _value="${_value%\'}"
        _value="${_value#\'}"
        export CLERK_SECRET_KEY="$_value"
      fi
    fi
  done
  [[ -n "${CLERK_SECRET_KEY:-}" ]] && break
  _parent="$(dirname "$_dir")"
  [[ "$_parent" == "$_dir" ]] && break
  _dir="$_parent"
done
unset _dir _parent _envfile _line _value

# Parse --admin flag
ADMIN=false
if [[ "${1:-}" == "--admin" ]]; then
  ADMIN=true
  shift
fi

METHOD="${1:?Usage: execute-request.sh [--admin] <METHOD> <PATH> [BODY]}"
PATH_ARG="${2:?Usage: execute-request.sh [--admin] <METHOD> <PATH> [BODY]}"
BODY="${3:-}"

METHOD_UPPER=$(echo "$METHOD" | tr '[:lower:]' '[:upper:]')
SCOPES="${CLERK_BAPI_SCOPES:-}"

# Returns success if $1 appears as an exact, normalized token in the
# comma-separated $SCOPES list (so "notwrite" can't satisfy "write").
_has_scope() {
  local target="$1" token
  local IFS=','
  for token in $SCOPES; do
    token="${token#"${token%%[![:space:]]*}"}"
    token="${token%"${token##*[![:space:]]}"}"
    [[ "$token" == "$target" ]] && return 0
  done
  return 1
}

# Scope check
if [[ "$ADMIN" == false ]]; then
  case "$METHOD_UPPER" in
    GET)
      ;; # always allowed
    POST|PUT|PATCH)
      if ! _has_scope "write"; then
        echo "ERROR: $METHOD_UPPER requests require CLERK_BAPI_SCOPES=\"write\" or --admin flag." >&2
        echo "Current CLERK_BAPI_SCOPES: \"$SCOPES\"" >&2
        exit 1
      fi
      ;;
    DELETE)
      if ! _has_scope "write" || ! _has_scope "delete"; then
        echo "ERROR: DELETE requests require CLERK_BAPI_SCOPES=\"write,delete\" or --admin flag." >&2
        echo "Current CLERK_BAPI_SCOPES: \"$SCOPES\"" >&2
        exit 1
      fi
      ;;
    *)
      echo "ERROR: Unknown HTTP method: $METHOD_UPPER" >&2
      exit 1
      ;;
  esac
fi

# Base URL: use CLERK_REST_API_URL if set, otherwise default to production
BASE_URL="${CLERK_REST_API_URL:-https://api.clerk.com}"

# Build curl command
CURL_ARGS=(
  -s
  -X "$METHOD_UPPER"
  "${BASE_URL}/v1${PATH_ARG}"
  -H "Authorization: Bearer ${CLERK_SECRET_KEY:?CLERK_SECRET_KEY is not set}"
  -H "Content-Type: application/json"
)

if [[ -n "$BODY" ]]; then
  CURL_ARGS+=(-d "$BODY")
fi

curl "${CURL_ARGS[@]}"
