import React from "react";

type Props = {
  width?: string;
  height?: string;
};

const CenterContent = (props: React.PropsWithChildren<Props>) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: props.width || "fit-content",
        height: props.height || "fit-content",
      }}
    >
      {props.children}
    </div>
  );
};

export default CenterContent;
