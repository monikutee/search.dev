import { useEffect, useState } from "react";
import { BootstrapContainerWidthEnum } from "./enums/BootstrapContainerWidthEnum";

interface DimensionsProps {
  width: undefined | number;
  height: undefined | number;
}

export const smallerThanMd = (width: number | undefined): boolean => {
  if (!width) return true;
  return width < BootstrapContainerWidthEnum.Md;
};

export const smallerThanLg = (width: number | undefined): boolean => {
  if (!width) return true;
  return width < BootstrapContainerWidthEnum.Lg;
};

const useWindowSize = (): DimensionsProps => {
  const [windowSize, setWindowSize] = useState<DimensionsProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
