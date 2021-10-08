import tw, { styled, TwStyle } from "twin.macro";

type Variant = "success" | "info" | "warning" | "error";

interface AlertProps {
  variant?: Variant;
}

const styles: Record<Variant, TwStyle> = {
  success: tw`bg-success-200 bg-opacity-50 border-success-300`,
  info: tw`bg-info-200 bg-opacity-50 border-info-300`,
  warning: tw`bg-warning-200 bg-opacity-50 border-warning-300`,
  error: tw`bg-danger-200 bg-opacity-50 border-danger-300`,
};

const Alert = styled.div<AlertProps>(
  tw`p-2 border rounded-sm`,
  ({ variant = "info" }) => styles[variant]
);

export default Alert;
