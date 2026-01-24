"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckCircle } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

export default function ContractSignPage() {
  const params = useParams();
  const router = useRouter();
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);

  // Mock contract data - replace with API call
  const contract = {
    id: params.contractId,
    title: "Wedding Photography Service Agreement",
    provider: "Elite Photography Studio",
    customer: "John & Jane Doe",
    date: "2024-01-15",
    content: `This Service Agreement is entered into between Elite Photography Studio ("Provider") and John & Jane Doe ("Client").

1. SERVICES
Provider agrees to provide professional wedding photography services on June 15, 2024.

2. DELIVERABLES
- 8 hours of coverage
- 500+ edited high-resolution photos
- Online gallery access
- Print rights

3. PAYMENT TERMS
Total: 1,500,000 RWF
Deposit: 500,000 RWF (due upon signing)
Balance: 1,000,000 RWF (due 7 days before event)

4. CANCELLATION POLICY
Cancellations made 30+ days before event: 50% refund
Cancellations made 14-29 days: 25% refund
Less than 14 days: No refund`,
    status: "sent",
    amount: 1500000,
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
  };

  const handleSign = async () => {
    if (!sigPadRef.current?.isEmpty() && agreed) {
      setSigning(true);
      const signatureData = sigPadRef.current.toDataURL();
      
      // TODO: Call API to sign contract
      // await apiClient.customer.contracts.sign(contract.id, { signature_data: signatureData });
      
      setTimeout(() => {
        router.push("/customer/contracts?signed=true");
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sign Contract</h1>
        <p className="text-muted-foreground">Review and sign your service agreement</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{contract.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Provider: {contract.provider}
                </p>
              </div>
              <Badge>{contract.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Contract Date:</span>
                <p className="font-medium">{contract.date}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Amount:</span>
                <p className="font-medium">{contract.amount.toLocaleString()} RWF</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm">{contract.content}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Digital Signature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-4">
              <SignatureCanvas
                ref={sigPadRef}
                canvasProps={{
                  className: "w-full h-40 bg-white rounded",
                }}
              />
            </div>
            <Button variant="outline" onClick={handleClear} className="w-full">
              Clear Signature
            </Button>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
              <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the terms and conditions outlined in this contract. I understand that this digital signature is legally binding.
              </label>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              disabled={!agreed || signing}
              onClick={handleSign}
            >
              {signing ? (
                "Signing..."
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Sign Contract
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
