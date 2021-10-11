import tw, { styled } from "twin.macro";

interface StatisticProps {
  className?: string;
  title: string;
  value: number;
  locales?: string | string[];
  formatOptions?: Intl.NumberFormatOptions;
}

const StatisticRoot = styled.div(tw`flex flex-col text-center`);

const StatisticTitle = styled.span(tw`block text-sm text-gray-500`);

const StatisticContent = styled.span(tw`mt-2 font-semibold text-lg`);

const Statistic = ({
  className,
  title,
  value,
  locales,
  formatOptions,
}: StatisticProps) => {
  const formatted = Intl.NumberFormat(locales, formatOptions).format(value);

  return (
    <StatisticRoot className={className}>
      <StatisticTitle>{title}</StatisticTitle>
      <StatisticContent>{formatted}</StatisticContent>
    </StatisticRoot>
  );
};

export default Statistic;
