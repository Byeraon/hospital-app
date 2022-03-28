import React from "react";
import { Container, Logo } from "src/components/styles";

export const Loader: React.FC = () => {
  return (
    <Container>
      <Logo theme={{ width: "200px", height: "200px", isAnim: true }} />
    </Container>
  );
};
