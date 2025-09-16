// src/components/PestDetection.jsx

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, AlertTriangle, CheckCircle, Leaf, Eye, Search, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Assuming you have this component
import { cropData } from "@/data"; // Import the data file

export function PestDetection() {
  // AI Detection State
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // Browse Feature State
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [activeTab, setActiveTab] = useState("Pests"); // 'Pests' or 'Diseases'
  const [selectedItem, setSelectedItem] = useState(null); // Holds the detailed info of a selected pest/disease

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        setResults(null);
        setSelectedItem(null); // Clear detailed view when a new image is uploaded
        setMessage(""); // Clear any previous messages
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResults(null);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/plant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image: selectedImage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "An unexpected error occurred.");
      } else if (data.result) {
        setResults(data.result);
        setMessage(data.message || "Pest detected.");
      } else {
        setMessage(data.message || "No results returned.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to analyze image. Check the server connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const severityBadgeVariant = (severity) => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Moderate':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing AI Detection Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            Pest & Disease Detection
          </CardTitle>
          <CardDescription>
            Upload crop images for instant AI-powered identification
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Crop Image</h3>
                <p className="text-muted-foreground mb-4">
                  Take a clear photo of affected leaves or crops for accurate detection
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose from Gallery
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative max-w-md mx-auto">
                  <img
                    src={selectedImage}
                    alt="Uploaded crop"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedImage(null);
                      setResults(null);
                      setMessage("");
                    }}
                  >
                    Upload New Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Status/Results Section */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Progress value={50} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">Analysis in progress...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {message && !isAnalyzing && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {results ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <p className="font-semibold">{message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && !isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-muted rounded-lg">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-destructive">{results.pest}</h3>
                <p className="text-muted-foreground">{results.description}</p>
              </div>
              <div className="text-right mt-3 sm:mt-0">
                <div className="text-2xl font-bold">{results.confidence}%</div>
                <Badge variant={severityBadgeVariant(results.severity)}>
                  {results.severity} Severity
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Immediate Treatment
              </h4>
              <div className="grid gap-2">
                {results.treatment.map((treatment, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm">{treatment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Prevention Tips
              </h4>
              <div className="grid gap-2">
                {results.prevention.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* NEW BROWSE FEATURE (Manual Library) */}
      <hr className="my-6" />
      {selectedItem ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              {selectedItem.name}
            </CardTitle>
            <CardDescription className="font-semibold text-muted-foreground">
              {selectedItem.scientificName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button variant="outline" onClick={() => setSelectedItem(null)} className="w-full sm:w-auto">
              ← Back to list
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="rounded-lg object-cover w-full h-auto max-h-[300px]"
              />
              <div className="space-y-2">
                <h4 className="font-semibold">Stage of Occurrence:</h4>
                <p className="text-sm text-muted-foreground">{selectedItem.stage}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Search className="h-5 w-5 text-info" />
                  Symptoms for Identification
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedItem.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
              {selectedItem.preventiveMeasures.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-success" />
                    Preventive Measures
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedItem.preventiveMeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Control Measures
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedItem.controlMeasures.map((control, index) => (
                    <li key={index}>{control}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Pest & Disease Library</CardTitle>
            <CardDescription>
              Browse by crop to identify common pests and diseases.
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.keys(cropData).map((crop) => (
                <Button
                  key={crop}
                  variant={selectedCrop === crop ? "default" : "outline"}
                  onClick={() => {
                    setSelectedCrop(crop);
                    setActiveTab("Pests");
                  }}
                >
                  {crop}
                </Button>
              ))}
            </div>
            <div className="flex border-b mt-4">
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 border-transparent ${activeTab === 'Pests' ? 'border-primary text-primary' : ''}`}
                onClick={() => setActiveTab('Pests')}
              >
                Pests
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 border-transparent ${activeTab === 'Diseases' ? 'border-primary text-primary' : ''}`}
                onClick={() => setActiveTab('Diseases')}
              >
                Diseases
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeTab === "Pests" && cropData[selectedCrop].pests.length > 0 ? (
                cropData[selectedCrop].pests.map((pest, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(pest)}
                    className="bg-card border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <img src={pest.image} alt={pest.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-center">{pest.name}</h4>
                    </div>
                  </div>
                ))
              ) : activeTab === "Diseases" && cropData[selectedCrop].diseases.length > 0 ? (
                cropData[selectedCrop].diseases.map((disease, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(disease)}
                    className="bg-card border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <img src={disease.image} alt={disease.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-center">{disease.name}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-4 text-center text-muted-foreground">No {activeTab.toLowerCase()} found for this crop yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photography Tips Card */}
      <hr className="my-6" />
      <Card>
        <CardHeader>
          <CardTitle>Photography Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-success">✓ Good Photos</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clear, well-lit images</li>
                <li>• Close-up of affected areas</li>
                <li>• Multiple angles if possible</li>
                <li>• Natural daylight preferred</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-destructive">✗ Avoid</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Blurry or dark images</li>
                <li>• Too far from the plant</li>
                <li>• Heavy shadows or glare</li>
                <li>• Multiple issues in one photo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}