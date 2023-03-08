import { ThemeProvider } from "styled-components";
import { Card } from "./components/Card";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card variant="first"/>
      <Card variant="second"/>
      <Card variant="third"/>
      <Card />
    </ThemeProvider>
  )
}
