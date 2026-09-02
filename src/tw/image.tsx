import type { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Image as ExpoImage, type ImageProps } from "expo-image";
import { useCssElement } from "react-native-css";

function CSSImage(props: ImageProps) {
  // @ts-expect-error: Remap objectFit style to contentFit property
  const { objectFit, objectPosition, ...style } =
    StyleSheet.flatten(props.style) || {};

  return (
    <ExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...props}
      style={style}
    />
  );
}

export type CSSImageProps = ComponentProps<typeof CSSImage> & {
  className?: string;
};

export const Image = (props: CSSImageProps) => {
  return useCssElement(CSSImage, props, { className: "style" });
};

Image.displayName = "CSS(Image)";
