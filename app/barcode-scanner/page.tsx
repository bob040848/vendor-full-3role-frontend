import BarcodeScannerComponent from "@/components/BarcodeScannerComponent";

export default function Home() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <BarcodeScannerComponent/>
      </div>
    
    </div>
  );
}