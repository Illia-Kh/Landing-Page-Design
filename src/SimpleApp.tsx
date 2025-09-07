import { Routes, Route, Navigate } from "react-router-dom";
import SimpleLayout from "./components/SimpleLayout";

export default function SimpleApp() {
  return (
    <div>
      <h1>Simple Routing App</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/cs" replace />} />
        <Route path="/:lang" element={<SimpleLayout />}>
          <Route index element={<div>Czech Home Page</div>} />
          <Route path="about" element={<div>About Page</div>} />
          <Route path="services" element={<div>Services Page</div>} />
          <Route path="contacts" element={<div>Contacts Page</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/cs" replace />} />
      </Routes>
    </div>
  );
}