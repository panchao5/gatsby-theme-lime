import * as React from "react";

export default function Homepage(props) {
  const { data }: { data: any } = props;
  console.log(props);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
