"use client";

import { useState } from "react";

export default function TestPage() {
  const [response, setResponse] = useState<any>(null);
  const fetchApi = async () => {
    const response = await fetch("/api/arcjet", {
      method: "POST",
    });
    const data = await response.json();

    setResponse(data);
    console.log(data);
  };
  return (
    <div>
      <h1>Page</h1>

      <button onClick={fetchApi}>Fetch API</button>

      <div>
        <pre>{JSON.stringify(response, null, 2)}</pre>

        
      </div>
    </div>
  );
}
