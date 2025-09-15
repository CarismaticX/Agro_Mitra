import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, AlertTriangle, CheckCircle, Leaf, Eye } from "lucide-react";
import { useState, useRef } from "react";

export function PestDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResults({
        pest: "Aphids",
        confidence: 94,
        severity: "Moderate",
        description: "Green aphids detected on leaf surface. These small, soft-bodied insects feed on plant sap and can cause leaf curling and yellowing.",
        treatment: [
          "Apply neem oil spray (2-3ml per liter of water)",
          "Introduce ladybugs as natural predators",
          "Remove heavily infested leaves",
          "Improve air circulation around plants"
        ],
        prevention: [
          "Regular monitoring of plants",
          "Avoid over-fertilizing with nitrogen",
          "Plant companion crops like marigolds",
          "Maintain proper plant spacing"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const commonPests = [
    { name: "Aphids", severity: "Common", color: "bg-warning" },
    { name: "Spider Mites", severity: "High Risk", color: "bg-destructive" },
    { name: "Whiteflies", severity: "Moderate", color: "bg-yellow-500" },
    { name: "Thrips", severity: "Low Risk", color: "bg-success" },
    { name: "Caterpillars", severity: "High Risk", color: "bg-destructive" },
    { name: "Leaf Miners", severity: "Moderate", color: "bg-yellow-500" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            Pest & Disease Detection
          </CardTitle>
          <CardDescription>
            Upload crop images for instant AI-powered pest and disease identification
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Upload Section */}
      <Card>
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

      {/* Analysis Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Detection Summary */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h3 className="text-xl font-bold text-destructive">{results.pest}</h3>
                <p className="text-muted-foreground">{results.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{results.confidence}%</div>
                <Badge variant={results.severity === 'High' ? 'destructive' : 'secondary'}>
                  {results.severity} Severity
                </Badge>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Immediate Treatment
              </h4>
              <div className="grid gap-2">
                {results.treatment.map((treatment: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm">{treatment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Tips */}
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Prevention Tips
              </h4>
              <div className="grid gap-2">
                {results.prevention.map((tip: string, index: number) => (
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

      {/* Common Pests Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Common Pests & Diseases</CardTitle>
          <CardDescription>Quick reference guide for identification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonPests.map((pest, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{pest.name}</h4>
                  <p className="text-sm text-muted-foreground">{pest.severity}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${pest.color}`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips for Better Detection */}
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