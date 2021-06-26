import React from "react";

import { TectonicProvider, useTectonicContext } from "./TectonicProvider";
import { Button } from "./Button";

export default {
  title: "Components/TectonicProvider",
  component: TectonicProvider,
};

function ContextLogger() {
  const ctx = useTectonicContext();
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    setHistory([...history, ctx]);
  }, [ctx]);

  return (
    <div>
      {history.map((item, index) => (
        <div key={index}>
          <div>Update {index + 1}.</div>
          <pre>{JSON.stringify(item, null, 2)}</pre>
          <br />
        </div>
      ))}
    </div>
  );
}

export const ProviderOutput = (args) => (
  <TectonicProvider
    {...args}
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    dateField="event.orderedAt"
  >
    <ContextLogger />
  </TectonicProvider>
);

export const Theming = (args) => (
  <TectonicProvider {...args}>
    <Button primary>Primary</Button>
    <Button basic>Basic</Button>
  </TectonicProvider>
);
