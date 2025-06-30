
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Calendar, Phone, FileText, Download, AlertTriangle, CheckCircle } from "lucide-react";

const ClientInsurance = () => {
  const insurancePolicy = {
    id: "POJ-2024-001",
    type: "Úrazové pojištění",
    provider: "Pojišťovna České spořitelny",
    policyNumber: "CS-789456123",
    validFrom: "2024-01-20",
    validTo: "2024-12-31",
    status: "active",
    premium: 2400,
    coverage: 500000,
    deductible: 1000,
    contactPhone: "+420 800 207 207",
    emergencyPhone: "+420 956 777 777"
  };

  const coverageDetails = [
    {
      type: "Úraz během kurzu",
      coverage: "100%",
      limit: "500 000 Kč",
      description: "Pokrytí úrazů vzniklých během oficiálních kurzů"
    },
    {
      type: "Zdravotní péče",
      coverage: "90%",
      limit: "200 000 Kč",
      description: "Úhrada zdravotní péče po úrazu"
    },
    {
      type: "Trvalé následky",
      coverage: "100%",
      limit: "500 000 Kč",
      description: "Jednorázové plnění při trvalých následcích"
    },
    {
      type: "Doprava do nemocnice",
      coverage: "100%",
      limit: "50 000 Kč",
      description: "Úhrada transportu do zdravotnického zařízení"
    }
  ];

  const claims = [
    {
      id: "SK-2024-001",
      date: "2024-01-15",
      type: "Drobný úraz",
      status: "closed",
      amount: 3500,
      description: "Řezná rána na ruce během kurzu"
    }
  ];

  const documents = [
    {
      id: 1,
      title: "Pojistná smlouva",
      type: "PDF",
      size: "1.2 MB",
      date: "2024-01-20"
    },
    {
      id: 2,
      title: "Všeobecné pojistné podmínky",
      type: "PDF",
      size: "800 KB",
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "Průkaz pojištění",
      type: "PDF",
      size: "200 KB",
      date: "2024-01-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Aktivní</Badge>;
      case 'expired':
        return <Badge className="bg-red-600">Vypršelo</Badge>;
      case 'pending':
        return <Badge className="bg-orange-600">Čeká na aktivaci</Badge>;
      default:
        return <Badge variant="outline">Neznámý</Badge>;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'closed':
        return <Badge className="bg-green-600">Vyřízeno</Badge>;
      case 'pending':
        return <Badge className="bg-orange-600">V řešení</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600">Zamítnuto</Badge>;
      default:
        return <Badge variant="outline">Neznámý</Badge>;
    }
  };

  const validityProgress = () => {
    const now = new Date();
    const start = new Date(insurancePolicy.validFrom);
    const end = new Date(insurancePolicy.validTo);
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  const daysRemaining = () => {
    const now = new Date();
    const end = new Date(insurancePolicy.validTo);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Pojištění
        </h1>
        {getStatusBadge(insurancePolicy.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Insurance Card */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-500" />
                <div>
                  <CardTitle className="text-rust-400 font-orbitron">{insurancePolicy.type}</CardTitle>
                  <p className="text-sm text-muted-foreground">{insurancePolicy.provider}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Číslo pojistky</p>
                  <p className="font-medium">{insurancePolicy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pojistné</p>
                  <p className="font-medium">{insurancePolicy.premium.toLocaleString()} Kč/rok</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pojistná částka</p>
                  <p className="font-medium">{insurancePolicy.coverage.toLocaleString()} Kč</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spoluúčast</p>
                  <p className="font-medium">{insurancePolicy.deductible.toLocaleString()} Kč</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Details */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Rozsah pojištění</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coverageDetails.map((coverage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-rust-800/20">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{coverage.type}</h4>
                      <p className="text-sm text-muted-foreground">{coverage.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{coverage.coverage}</div>
                      <div className="text-sm text-muted-foreground">do {coverage.limit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Historie škod</CardTitle>
            </CardHeader>
            <CardContent>
              {claims.length > 0 ? (
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-rust-800/20">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-foreground">{claim.id}</h4>
                          {getClaimStatusBadge(claim.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{claim.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(claim.date).toLocaleDateString('cs-CZ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">{claim.amount.toLocaleString()} Kč</div>
                        <div className="text-sm text-muted-foreground">{claim.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Zatím žádné škody</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Policy Status */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Stav pojistky</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{daysRemaining()}</div>
                  <p className="text-sm text-muted-foreground">dní do vypršení</p>
                </div>
                <Progress value={validityProgress()} className="h-3" />
                <div className="text-sm text-muted-foreground text-center">
                  Platnost: {new Date(insurancePolicy.validFrom).toLocaleDateString('cs-CZ')} - {new Date(insurancePolicy.validTo).toLocaleDateString('cs-CZ')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Kontakty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Běžný kontakt</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rust-400" />
                    <a href={`tel:${insurancePolicy.contactPhone}`} className="font-medium hover:text-rust-400">
                      {insurancePolicy.contactPhone}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nouzová linka</p>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <a href={`tel:${insurancePolicy.emergencyPhone}`} className="font-medium text-red-500 hover:text-red-400">
                      {insurancePolicy.emergencyPhone}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Dokumenty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-rust-800/20">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Rychlé akce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-rust-600 hover:bg-rust-700">
                  Nahlásit škodu
                </Button>
                <Button variant="outline" className="w-full border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                  Prodloužit pojistku
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientInsurance;
