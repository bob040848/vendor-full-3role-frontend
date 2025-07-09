"use client";
import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";

const QrReader = dynamic(
  () => import("react-qr-barcode-scanner"),
  { 
    ssr: false,
    loading: () => <p>Loading QR scanner...</p>
  }
);

const BarcodeScannerComponent = () => {
  const [barcode, setBarcode] = useState("No result");
  const [parsedData, setParsedData] = useState<any>(null);
  const [dataType, setDataType] = useState<string>("unknown");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanAttempts, setScanAttempts] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const parseScannedData = useCallback((text: string) => {
    if (text.match(/^https?:\/\//i)) {
      try {
        const url = new URL(text);
        return {
          type: "URL",
          data: {
            fullUrl: text,
            protocol: url.protocol,
            hostname: url.hostname,
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
          }
        };
      } catch (e) {
        return { type: "URL", data: { fullUrl: text, note: "Invalid URL format" } };
      }
    }

    if (text.match(/^mailto:/i)) {
      const email = text.replace(/^mailto:/i, '');
      return {
        type: "Email",
        data: {
          email: email,
          action: "Send email to " + email
        }
      };
    }

    if (text.match(/^tel:/i)) {
      const phone = text.replace(/^tel:/i, '');
      return {
        type: "Phone",
        data: {
          phoneNumber: phone,
          action: "Call " + phone
        }
      };
    }

    if (text.startsWith('WIFI:')) {
      const wifiMatch = text.match(/WIFI:T:([^;]*);S:([^;]*);P:([^;]*);H:([^;]*);?/i);
      if (wifiMatch) {
        return {
          type: "WiFi",
          data: {
            security: wifiMatch[1] || "None",
            networkName: wifiMatch[2] || "Unknown",
            password: wifiMatch[3] || "No password",
            hidden: wifiMatch[4] === "true" ? "Yes" : "No"
          }
        };
      }
    }

    if (text.includes('BEGIN:VCARD')) {
      const contact: any = {};
      const lines = text.split('\n');
      
      lines.forEach(line => {
        if (line.startsWith('FN:')) contact.fullName = line.substring(3);
        if (line.startsWith('ORG:')) contact.organization = line.substring(4);
        if (line.startsWith('TEL:')) contact.phone = line.substring(4);
        if (line.startsWith('EMAIL:')) contact.email = line.substring(6);
        if (line.startsWith('URL:')) contact.website = line.substring(4);
        if (line.startsWith('ADR:')) contact.address = line.substring(4).replace(/;/g, ', ');
        if (line.startsWith('NOTE:')) contact.note = line.substring(5);
      });

      return {
        type: "Contact (vCard)",
        data: contact
      };
    }

    if (text.startsWith('SMSTO:')) {
      const smsMatch = text.match(/SMSTO:([^:]*):?(.*)/i);
      if (smsMatch) {
        return {
          type: "SMS",
          data: {
            phoneNumber: smsMatch[1],
            message: smsMatch[2] || "No message"
          }
        };
      }
    }

    if (text.match(/^geo:/i)) {
      const geoMatch = text.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/i);
      if (geoMatch) {
        return {
          type: "Location",
          data: {
            latitude: parseFloat(geoMatch[1]),
            longitude: parseFloat(geoMatch[2]),
            coordinates: `${geoMatch[1]}, ${geoMatch[2]}`,
            mapsUrl: `https://maps.google.com/maps?q=${geoMatch[1]},${geoMatch[2]}`
          }
        };
      }
    }

    if (text.includes('BEGIN:VEVENT')) {
      const event: any = {};
      const lines = text.split('\n');
      
      lines.forEach(line => {
        if (line.startsWith('SUMMARY:')) event.title = line.substring(8);
        if (line.startsWith('DTSTART:')) event.startDate = line.substring(8);
        if (line.startsWith('DTEND:')) event.endDate = line.substring(6);
        if (line.startsWith('LOCATION:')) event.location = line.substring(9);
        if (line.startsWith('DESCRIPTION:')) event.description = line.substring(12);
      });

      return {
        type: "Calendar Event",
        data: event
      };
    }

   
    try {
      const jsonData = JSON.parse(text);
      return {
        type: "JSON Data",
        data: jsonData
      };
    } catch (e) {
    }

    
    if (text.match(/^\d+$/)) {
      const length = text.length;
      let barcodeType = "Numeric Code";
      
      if (length === 13) barcodeType = "EAN-13 (Product Barcode)";
      else if (length === 12) barcodeType = "UPC-A (Product Barcode)";
      else if (length === 8) barcodeType = "EAN-8 (Product Barcode)";
      else if (length === 10) barcodeType = "ISBN-10";
      else if (length === 13 && text.startsWith('978')) barcodeType = "ISBN-13";

      return {
        type: barcodeType,
        data: {
          code: text,
          length: length,
          note: length >= 8 ? "This might be a product barcode that can be looked up" : "Unknown numeric code"
        }
      };
    }

    return {
      type: "Plain Text",
      data: {
        text: text,
        length: text.length,
        wordCount: text.split(/\s+/).filter(word => word.length > 0).length,
        lineCount: text.split('\n').length
      }
    };
  }, []);

  const startScanning = useCallback(() => {
    setIsScanning(true);
    setBarcode("Scanning...");
    setError(null);
    setScanAttempts(0);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
    setBarcode(barcode === "Scanning..." ? "No result" : barcode);
    setIsFullscreen(false);
  }, [barcode]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleScan = useCallback((result: string | null) => {
    if (result) {
      console.log("Scan successful:", result);
      const textResult = String(result);
      setBarcode(textResult);
      
      const parsed = parseScannedData(textResult);
      setParsedData(parsed.data);
      setDataType(parsed.type);
      
      setIsScanning(false);
      setIsFullscreen(false);
      setError(null);
    }
  }, [parseScannedData]);

  const handleError = useCallback((error: any) => {
    setScanAttempts(prev => prev + 1);
    
    console.log("Scanner error:", error);
    
    if (error?.message?.includes("No MultiFormat Readers were able to detect the code")) {
      return;
    }
    
    if (error?.name === 'NotAllowedError') {
      setError("Camera permission denied. Please allow camera access and refresh the page.");
      setIsScanning(false);
      return;
    }
    
    if (error?.name === 'NotFoundError') {
      setError("No camera found. Please make sure you have a camera connected.");
      setIsScanning(false);
      return;
    }
    
    if (scanAttempts > 50) { 
      console.warn("Many scan attempts failed, but this is often normal");
      setScanAttempts(0);
    }
    
    if (error?.message && !error.message.includes("No MultiFormat Readers")) {
      setError(`Scanner error: ${error.message}`);
    }
  }, [scanAttempts]);

  const getScannerDimensions = () => {
    if (isFullscreen) {
      return {
        width: Math.min(window.innerWidth - 40, 800),
        height: Math.min(window.innerHeight - 200, 600)
      };
    }
    return {
      width: Math.min(window.innerWidth - 40, 500),
      height: Math.min(window.innerWidth - 40, 500) * 0.75 
    };
  };

  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getScannerDimensions());
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: isFullscreen ? "none" : "600px", 
      margin: "0 auto",
      position: isFullscreen ? "fixed" : "relative",
      top: isFullscreen ? "0" : "auto",
      left: isFullscreen ? "0" : "auto",
      right: isFullscreen ? "0" : "auto",
      bottom: isFullscreen ? "0" : "auto",
      zIndex: isFullscreen ? 9999 : "auto",
      backgroundColor: isFullscreen ? "rgba(0,0,0,0.9)" : "transparent",
      padding: isFullscreen ? "20px" : "0"
    }}>
      {!isFullscreen && <h2>QR/Barcode Scanner</h2>}
      
      {error && (
        <div style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#ffebee",
          border: "1px solid #f44336",
          borderRadius: "5px",
          color: "#d32f2f"
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {isScanning ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          height: isFullscreen ? "100%" : "auto",
          justifyContent: isFullscreen ? "center" : "flex-start"
        }}>
          <div style={{ 
            border: "2px solid #4CAF50", 
            borderRadius: "10px", 
            overflow: "hidden",
            marginBottom: "15px",
            position: "relative",
            maxWidth: "100%"
          }}>
            <QrReader
              width={dimensions.width}
              height={dimensions.height}
              onUpdate={(err: any, result: any) => {
                if (result) {
                  handleScan(result.text);
                } else if (err) {
                  handleError(err);
                }
              }}
              constraints={{
                video: {
                  facingMode: "environment", 
                  width: { ideal: 1920 },
                  height: { ideal: 1080 }
                }
              }}
            />
            
            <button
              onClick={toggleFullscreen}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "8px 12px",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "12px",
                zIndex: 10
              }}
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
          
          <div style={{ 
            textAlign: "center", 
            marginBottom: "15px",
            color: isFullscreen ? "white" : "inherit"
          }}>
            <p style={{ 
              fontSize: "16px", 
              color: isFullscreen ? "white" : "#666",
              margin: "5px 0"
            }}>
              Point your camera at a QR code or barcode
            </p>
            <p style={{ 
              fontSize: "14px", 
              color: isFullscreen ? "#ccc" : "#888",
              margin: "0"
            }}>
              Make sure the code is well-lit and clearly visible
            </p>
          </div>
          
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            <button 
              onClick={stopScanning}
              style={{
                padding: "12px 20px",
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                minWidth: "120px"
              }}
            >
              Stop Scanning
            </button>
            
            {!isFullscreen && (
              <button 
                onClick={toggleFullscreen}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  minWidth: "120px"
                }}
              >
                Go Fullscreen
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{
            padding: "40px",
            border: "2px dashed #ccc",
            borderRadius: "10px",
            marginBottom: "20px",
            backgroundColor: "#f9f9f9"
          }}>
            <p style={{ 
              fontSize: "18px", 
              color: "#666",
              margin: "0 0 20px 0"
            }}>
              📷 Ready to scan
            </p>
            <button 
              onClick={startScanning}
              style={{
                padding: "12px 24px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Start Camera
            </button>
          </div>
        </div>
      )}
      
      {!isFullscreen && (
        <>
          <div style={{ 
            marginTop: "20px", 
            padding: "15px", 
            backgroundColor: barcode !== "No result" && barcode !== "Scanning..." ? "#e8f5e8" : "#f5f5f5", 
            borderRadius: "8px",
            border: barcode !== "No result" && barcode !== "Scanning..." ? "2px solid #4CAF50" : "1px solid #ddd"
          }}>
            <strong>Raw Scanned Data:</strong> 
            <div style={{ 
              marginTop: "8px", 
              fontSize: "14px",
              fontFamily: "monospace",
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              maxHeight: "100px",
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {barcode}
            </div>
          </div>

          {parsedData && dataType !== "unknown" && (
            <div style={{ 
              marginTop: "15px", 
              padding: "15px", 
              backgroundColor: "#f0f8ff", 
              borderRadius: "8px",
              border: "2px solid #2196F3"
            }}>
              <h3 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "18px", 
                color: "#1976D2",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                📋 Parsed Data ({dataType})
              </h3>
              
              <div style={{ 
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd"
              }}>
                {typeof parsedData === 'object' ? (
                  Object.entries(parsedData).map(([key, value], index) => (
                    <div key={index} style={{ 
                      marginBottom: "8px",
                      paddingBottom: "8px",
                      borderBottom: index < Object.entries(parsedData).length - 1 ? "1px solid #eee" : "none"
                    }}>
                      <strong style={{ color: "#555", textTransform: "capitalize" }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </strong>
                      <div style={{ 
                        marginTop: "4px",
                        fontSize: "15px",
                        wordBreak: "break-all",
                        lineHeight: "1.4"
                      }}>
                        {String(value)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: "15px" }}>{String(parsedData)}</div>
                )}
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {dataType === "URL" && parsedData.fullUrl && (
                  <button
                    onClick={() => window.open(parsedData.fullUrl, '_blank')}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    🔗 Open URL
                  </button>
                )}
                
                {dataType === "Email" && parsedData.email && (
                  <button
                    onClick={() => window.location.href = `mailto:${parsedData.email}`}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#FF9800",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    ✉️ Send Email
                  </button>
                )}
                
                {dataType === "Phone" && parsedData.phoneNumber && (
                  <button
                    onClick={() => window.location.href = `tel:${parsedData.phoneNumber}`}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    📞 Call
                  </button>
                )}
                
                {dataType === "Location" && parsedData.mapsUrl && (
                  <button
                    onClick={() => window.open(parsedData.mapsUrl, '_blank')}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#9C27B0",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    🗺️ View on Maps
                  </button>
                )}
                
                {dataType.includes("Barcode") && parsedData.code && (
                  <button
                    onClick={() => window.open(`https://www.google.com/search?q=${parsedData.code}+barcode+product`, '_blank')}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#795548",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    🔍 Look Up Product
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={{ 
            marginTop: "15px", 
            padding: "12px", 
            backgroundColor: "#fff3e0", 
            borderRadius: "6px",
            border: "1px solid #ffb74d"
          }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => navigator.clipboard.writeText(barcode)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#607D8B",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                📋 Copy Raw Data
              </button>
              
              {parsedData && (
                <button
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2))}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#37474F",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  📄 Copy Parsed Data
                </button>
              )}
            </div>
          </div>

          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
            border: "1px solid #b3d9ff"
          }}>
            {/* <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#0066cc" }}>
              📝 Scanning Tips:
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "14px", color: "#555" }}>
              <li>Ensure good lighting</li>
              <li>Hold camera steady</li>
              <li>Keep the code within the camera frame</li>
              <li>Try different distances (6-12 inches works best)</li>
              <li>Make sure the code isn't blurry or damaged</li>
              <li>Use fullscreen mode for better visibility</li>
              <li>Scanned data will be automatically parsed and formatted</li>
              <li>Supports URLs, contacts, WiFi, locations, and more</li>
              <li>Action buttons appear based on the type of data detected</li>
              <li>Both raw and parsed data can be copied</li>
            </ul> */}
          </div>
        </>
      )}
    </div>
  );
};

export default BarcodeScannerComponent;