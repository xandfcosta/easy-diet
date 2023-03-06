import { styled, Flex, Title } from "../styles/Styles";

export const Container = styled(Flex, {
  height: "100px",
  width: "100%",
  backgroundColor: "$darkerGrey",
  justifyContent: "left",
});

export const TitleApp = styled(Title, {
  fontWeight: "$black",
  fontSize: "$1",
});

export function NavBar() {
  return (
    <Container dir={"h"}>
      <TitleApp>Dieta Fácil</TitleApp>
    </Container>
  );
}
