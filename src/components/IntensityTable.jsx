import { Flex, styled, Label, Grid, Title } from "../styles/Styles";

const Container = styled(Flex, {
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  padding: "20px",
  width: "500px",
  backgroundColor: "$darkGrey",
  borderRadius: "30px",
  boxShadow: "$spaced",
  gap: "20px",
});
const GridIntensity = styled(Grid, {
  height: "100%",
  width: "100%",
  gridTemplateColumns: "1fr 2fr",
  gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
  rowGap: "15px",
});
const IntensityTitle = styled(Title, {
  fontSize: "$1",
  fontWeight: "$black",
  padding: "0px",
});

export function IntensityTable() {
  return (
    <Container dir={"v"}>
      <IntensityTitle size={"medium"}>Atividade Física</IntensityTitle>
      <GridIntensity>
        <Label>Sedentário</Label>
        <Label color={"mid"}>Pouco ou nenhum exercício</Label>
        <Label>Pouco</Label>
        <Label color={"mid"}>Esportes 1-3 dias / semana</Label>
        <Label>Moderado</Label>
        <Label color={"mid"}>Esportes 3-5 dias / semana</Label>
        <Label>Muito</Label>
        <Label color={"mid"}>Esportes 6-7 dias / semana</Label>
        <Label>Demais</Label>
        <Label color={"mid"}>Esportes e trabalho braçal</Label>
      </GridIntensity>
    </Container>
  );
}
