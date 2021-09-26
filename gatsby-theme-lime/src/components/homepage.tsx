import tw, { styled } from "twin.macro";
import { PageProps } from "gatsby";
import Layout from "./layout";

const Container = styled.div(tw`flex-row justify-center`);

export default function Homepage(props: PageProps<any>) {
  const { data } = props;

  return (
    <Layout>
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </Layout>
  );
}
