import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mic, Send, Bot, User, Leaf, Lightbulb } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// Define inline locales and i18n configuration
const resources = {
  en: {
    translation: {
      title: "AI Crop Advisory",
      description: "Get personalized farming advice powered by artificial intelligence",
      welcome_message: "Hello! I'm your AI farming assistant. I can help you with crop advice, fertilizer recommendations, irrigation planning, and more. What farming question do you have today?",
      error_message: "⚠️ Could not generate response. Please try again later.",
      language: "Language:",
      inputPlaceholder: "Ask your farming question here...",
      voiceStart: "Voice Input",
      voiceStop: "Stop Recording",
      send: "Send",
      typing: "AI is typing...",
      popular: "Popular Questions",
      qq1: "Best fertilizer for tomatoes?",
      qq2: "When to plant wheat?",
      qq3: "How to prevent crop diseases?",
      qq4: "Irrigation schedule for corn?",
      qq5: "Organic pest control methods",
      qq6: "Soil pH requirements",
      features: {
        crop: "Crop Specific",
        cropDesc: "Tailored advice for your specific crops",
        ai: "AI Powered",
        aiDesc: "Advanced machine learning insights",
        avail: "24/7 Available",
        availDesc: "Get help whenever you need it"
      }
    },
  },
  hi: {
    translation: {
      title: "एआई फसल सलाह",
      description: "कृत्रिम बुद्धिमत्ता द्वारा संचालित व्यक्तिगत खेती की सलाह प्राप्त करें",
      welcome_message: "नमस्ते! मैं आपकी एआई खेती सहायक हूँ। मैं आपको फसल की सलाह, उर्वरक सिफारिशें, सिंचाई योजना और बहुत कुछ में मदद कर सकती हूँ। आज आपका क्या खेती का प्रश्न है?",
      error_message: "⚠️ प्रतिक्रिया उत्पन्न नहीं हो सकी। कृपया बाद में पुनः प्रयास करें।",
      language: "भाषा:",
      inputPlaceholder: "अपना खेती से संबंधित प्रश्न यहाँ पूछें...",
      voiceStart: "आवाज़ से इनपुट",
      voiceStop: "रिकॉर्डिंग रोकें",
      send: "भेजें",
      typing: "एआई लिख रहा है...",
      popular: "लोकप्रिय प्रश्न",
      qq1: "टमाटर के लिए सबसे अच्छा उर्वरक?",
      qq2: "गेहूं कब बोना है?",
      qq3: "फसल के रोगों को कैसे रोकें?",
      qq4: "मक्का के लिए सिंचाई का कार्यक्रम?",
      qq5: "जैविक कीट नियंत्रण के तरीके",
      qq6: "मिट्टी पीएच की आवश्यकताएं",
      features: {
        crop: "फसल विशेष",
        cropDesc: "आपकी विशेष फसलों के लिए सलाह",
        ai: "एआई आधारित",
        aiDesc: "उन्नत मशीन लर्निंग जानकारी",
        avail: "24/7 उपलब्ध",
        availDesc: "जब भी ज़रूरत हो, मदद पाएं"
      }
    },
  },
  kn: {
    translation: {
      title: "ಎಐ ಬೆಳೆ ಸಲಹೆ",
      description: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯಿಂದ ಚಾಲಿತ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ",
      welcome_message: "ನಮಸ್ತೆ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆ ಸಲಹೆ, ರಸಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳು, ನೀರಾವರಿ ಯೋಜನೆ ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳೊಂದಿಗೆ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು. ಇಂದು ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆ ಏನು?",
      error_message: "⚠️ ಪ್ರತಿಕ್ರಿಯೆ ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      language: "ಭಾಷೆ:",
      inputPlaceholder: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಕೇಳಿ...",
      voiceStart: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
      voiceStop: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
      send: "ಕಳುಹಿಸಿ",
      typing: "ಎಐ ಟೈಪ್ ಮಾಡುತ್ತಿದೆ...",
      popular: "ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು",
      qq1: "ಟೊಮೆಟೊಗೆ ಉತ್ತಮ ರಸಗೊಬ್ಬರ?",
      qq2: "ಗೋಧಿ ಯಾವಾಗ ನೆಡಬೇಕು?",
      qq3: "ಬೆಳೆ ರೋಗಗಳನ್ನು ಹೇಗೆ ತಡೆಗಟ್ಟುವುದು?",
      qq4: "ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ?",
      qq5: "ಸಾವಯವ ಕೀಟ ನಿಯಂತ್ರಣ ವಿಧಾನಗಳು",
      qq6: "ಮಣ್ಣಿನ pH ಅವಶ್ಯಕತೆಗಳು",
      features: {
        crop: "ಬೆಳೆ ವಿಶೇಷ",
        cropDesc: "ನಿಮ್ಮ ವಿಶೇಷ ಬೆಳೆಗಳಿಗೆ ಹೊಂದುವ ಸಲಹೆ",
        ai: "ಎಐ ಚಾಲಿತ",
        aiDesc: "ಆಧುನಿಕ ಯಂತ್ರ ಕಲಿಕೆಯ ಒಳನೋಟಗಳು",
        avail: "24/7 ಲಭ್ಯವಿದೆ",
        availDesc: "ನಿಮಗೆ ಬೇಕಾದಾಗ ಸಹಾಯ ಪಡೆಯಿರಿ"
      }
    },
  },
  ta: {
    translation: {
      title: "ஏஐ பயிர் ஆலோசனை",
      description: "செயற்கை நுண்ணறிவால் இயக்கப்படும் தனிப்பட்ட விவசாய ஆலோசனையைப் பெறுங்கள்",
      welcome_message: "வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். பயிர் ஆலோசனை, உர பரிந்துரைகள், நீர்ப்பாசனத் திட்டம் மற்றும் பலவற்றில் நான் உங்களுக்கு உதவ முடியும். இன்று உங்கள் விவசாயக் கேள்வி என்ன?",
      error_message: "⚠️ பதிலைத் உருவாக்க முடியவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
      language: "மொழி:",
      inputPlaceholder: "உங்கள் விவசாய கேள்வியை இங்கே கேளுங்கள்...",
      voiceStart: "குரல் உள்ளீடு",
      voiceStop: "பதிவு நிறுத்து",
      send: "அனுப்பு",
      typing: "ஏஐ எழுதுகிறது...",
      popular: "பிரபலமான கேள்விகள்",
      qq1: "தக்காளிக்கான சிறந்த உரம்?",
      qq2: "கோதுமை எப்போது நட வேண்டும்?",
      qq3: "பயிர் நோய்களை எவ்வாறு தடுப்பது?",
      qq4: "சோளத்திற்கான நீர்ப்பாசன அட்டவணை?",
      qq5: "இயற்கை பூச்சி கட்டுப்பாடு முறைகள்",
      qq6: "மண் pH தேவைகள்",
      features: {
        crop: "பயிர் சிறப்பு",
        cropDesc: "உங்கள் குறிப்பிட்ட பயிர்களுக்கு ஏற்ப ஆலோசனை",
        ai: "ஏஐ மூலம் இயக்கப்படுகிறது",
        aiDesc: "மேம்பட்ட இயந்திர கற்றல் பார்வைகள்",
        avail: "24/7 கிடைக்கும்",
        availDesc: "உங்களுக்கு எப்போது வேண்டுமானாலும் உதவி பெறுங்கள்"
      }
    },
  },
  te: {
    translation: {
      title: "ఏఐ పంట సలహా",
      description: "కృత్రిమ మేధస్సుతో నడిచే వ్యక్తిగత వ్యవసాయ సలహా పొందండి",
      welcome_message: "నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడిని. నేను మీకు పంట సలహా, ఎరువుల సిఫార్సులు, నీటిపారుదల ప్రణాళిక మరియు మరిన్నింటితో సహాయం చేయగలను. ఈరోజు మీ వ్యవసాయ ప్రశ్న ఏమిటి?",
      error_message: "⚠️ ప్రతిస్పందనను రూపొందించలేకపోయింది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
      language: "భాష:",
      inputPlaceholder: "మీ వ్యవసాయ ప్రశ్నను ఇక్కడ అడగండి...",
      voiceStart: "వాయిస్ ఇన్‌పుట్",
      voiceStop: "రికార్డింగ్ ఆపండి",
      send: "పంపండి",
      typing: "ఏఐ టైప్ చేస్తోంది...",
      popular: "ప్రసిద్ధ ప్రశ్నలు",
      qq1: "టమాటాలకు ఉత్తమ ఎరువు?",
      qq2: "గోధుమ ఎప్పుడు నాటాలి?",
      qq3: "పంట తెగుళ్లను ఎలా నివారించాలి?",
      qq4: "మొక్కజొన్నకు నీటిపారుదల షెడ్యూల్?",
      qq5: "సేంద్రీయ తెగులు నియంత్రణ పద్ధతులు",
      qq6: "నేల pH అవసరాలు",
      features: {
        crop: "పంట ప్రత్యేకం",
        cropDesc: "మీ ప్రత్యేక పంటలకు అనుకూల సలహా",
        ai: "ఏఐ ఆధారితం",
        aiDesc: "అధునాతన మెషిన్ లెర్నింగ్ అంతర్దృష్టులు",
        avail: "24/7 అందుబాటులో",
        availDesc: "మీకు ఎప్పుడైనా సహాయం పొందండి"
      }
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function AIAdvisory() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // Voice recognition state and logic
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize messages once, when language changes
    setMessages([
      {
        id: 1,
        type: "bot",
        content: t("welcome_message"),
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, [selectedLang, t]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = selectedLang;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      setMessage(finalTranscript.trim() + interimTranscript.trim());
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLang]);

  const handleVoiceInput = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        setMessage("");
        recognitionRef.current.start();
        setIsRecording(true);
      }
    }
  };

  const handleSendMessage = async (msgContent) => {
    if (!msgContent.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      type: "user",
      content: msgContent,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.content, language: selectedLang }),
      });
      const data = await res.json();

      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: data.text,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error("AI fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          type: "bot",
          content: t("error_message"),
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
    setLoading(false);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
  ];

  const quickQuestions = [
    t("qq1"),
    t("qq2"),
    t("qq3"),
    t("qq4"),
    t("qq5"),
    t("qq6"),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">{t("language")}</span>
            {languages.map((lang) => (
              <Badge
                key={lang.code}
                variant={selectedLang === lang.code ? "default" : "outline"}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setSelectedLang(lang.code);
                }}
                className="cursor-pointer"
              >
                {lang.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    msg.type === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {msg.type === "bot" ? (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-sm text-muted-foreground italic">
                {t("typing")}
              </p>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4 space-y-4">
            <Textarea
              placeholder={t("inputPlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px] resize-none"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(message);
                }
              }}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceInput}
                className={
                  isRecording
                    ? "bg-destructive text-destructive-foreground"
                    : ""
                }
              >
                <Mic className="h-4 w-4 mr-2" />
                {isRecording ? t("voiceStop") : t("voiceStart")}
              </Button>

              <Button onClick={() => handleSendMessage(message)} className="ml-auto">
                <Send className="h-4 w-4 mr-2" />
                {t("send")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            {t("popular")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left"
                onClick={() => handleQuickQuestion(question)}
              >
                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">{t("features.crop")}</h3>
            <p className="text-sm text-muted-foreground">{t("features.cropDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">{t("features.ai")}</h3>
            <p className="text-sm text-muted-foreground">{t("features.aiDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">{t("features.avail")}</h3>
            <p className="text-sm text-muted-foreground">{t("features.availDesc")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}