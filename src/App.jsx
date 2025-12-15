import React, { useState, useRef } from 'react';
import { Printer, Edit3, Eye, FileText, Download } from 'lucide-react';

const LuxuryDoc = () => {
  // State for the document sections
  const [companyName, setCompanyName] = useState("GLEIPNERGRUPPEN");
  const [docTitle, setDocTitle] = useState("Frågor och Information");
  // Updated introText with the paragraph break (\n\n) as requested
  const [introText, setIntroText] = useState("Syftet med detta dokument är att skapa en grundstruktur samt att samla relevant praktisk information. Det innehåller även frågor till er, tillsammans med några förslag på svar. Om ni samtycker och anser dem lämpliga är det bara att läsa vidare. Ni är också varmt välkomna att komplettera med ytterligare detaljer där ni tycker att det är relevant, även i de fall där ni instämmer i föreslagna svar.\n\nJag har fokuserat på de mest preliminära frågorna som behöver besvaras för marknadsplanens utveckling. Fler frågor kommer att tillkomma när vi går djupare in i detaljerna.");
  
  // Splitting the Q&A content into manageable blocks for better styling
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Preliminära Frågor",
      content: `Vad gör er unika jämfört med konkurrenterna?
Svar: Kvalitet och en lyxig känsla till ett bra pris.

Vad värdesätter era kunder mest när de väljer er?
Svar: Trygghet, hög kvalitet, moderna lösningar och prisvärdhet.

Finns det exempel på innehåll och företag som ni tycker om, både vad gäller marknadsföring och kvalitet?

Vilka är inloggningsuppgifterna till Instagram och Facebook?

Har ni något befintligt material som jag kan få tillgång till och återanvända?

Är det något som är känsligt eller konfidentiellt vid filmning och inläggskapande?

Vilka pågående projekt har ni som ska inkluderas i marknadsplanen?

Finns det andra marknadsföringskanaler, utöver sociala medier, som ni vill att vi tar med i marknadsplanen?

Är det något mer ni vill prioritera redan från start?`
    },
    {
      id: 2,
      title: "Brandstrategi",
      content: `Finns det någon brandbok som jag kan få ta del av utöver det material jag redan fått?
(Till exempel färger, logo utan bakgrund, typsnitt, tonalitet)`
    },
    {
      id: 3,
      title: "Organisation & Kommunikation",
      content: `Hur ofta vill ni att vi har en check-in?
Svar: En gång i månaden och en gång i kvartalet.

Hur föredrar ni att kommunikationen sker?
(WhatsApp, e-post eller annan plattform)`
    },
    {
      id: 4,
      title: "Budget & Utrustning",
      content: `Hur mycket kan ni tänka avsätta för sociala medier, exempelvis annonsering?

Utrustning: Efter den första inspelningsdagen (torsdag den 18:e, kl. 09:00–13:00) kommer jag att utvärdera vilken utrustning som behövs på plats.`
    }
  ]);

  const [activeTab, setActiveTab] = useState('edit');

  const handlePrint = () => {
    // This function uses the browser's built-in print dialog, 
    // which allows the user to 'Save as PDF' from the print menu.
    window.print();
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  // Helper to render text with bold Q&A logic
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-4"></div>;
      
      // Highlight "Svar
