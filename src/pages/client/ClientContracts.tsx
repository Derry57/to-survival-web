
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Calendar, FileText, Eye, Shield, Upload } from "lucide-react";

const ClientContracts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const contracts = [
    {
      id: "SM-2024-001",
      type: "course",
      title: "Smlouva o účasti na kurzu Urban Survival",
      courseId: 1,
      courseName: "Urban Survival - Praha",
      signedDate: "2024-02-10",
      validFrom: "2024-03-15",
      validTo: "2024-03-17",
      status: "active",
      downloadUrl: "#",
      description: "Smlouva upravující podmínky účasti na kurzu městského přežití.",
      needsSignature: false
    },
    {
      id: "SM-2024-002",
      type: "course",
      title: "Smlouva o účasti na kurzu Wilderness Expert",
      courseId: 2,
      courseName: "Wilderness Expert",
      signedDate: "2024-02-25",
      validFrom: "2024-03-22",
      validTo: "2024-03-24",
      status: "pending",
      downloadUrl: "#",
      description: "Smlouva pro pokročilý kurz přežití v divočině.",
      needsSignature: true
    },
    {
      id: "SM-2024-003",
      type: "insurance",
      title: "Pojistná smlouva - Úrazové pojištění",
      courseId: null,
      courseName: null,
      signedDate: "2024-01-15",
      validFrom: "2024-01-20",
      validTo: "2024-12-31",
      status: "active",
      downloadUrl: "#",
      description: "Úrazové pojištění pokrývající aktivity během kurzů přežití.",
      needsSignature: false
    },
    {
      id: "SM-2023-045",
      type: "course",
      title: "Smlouva o účasti na kurzu Medical Training",
      courseId: 3,
      courseName: "Medical Training",
      signedDate: "2023-12-01",
      validFrom: "2024-02-12",
      validTo: "2024-02-14",
      status: "completed",
      downloadUrl: "#",
      description: "Smlouva pro kurz první pomoci v extrémních situacích.",
      needsSignature: false
    }
  ];

  const handleFileUpload = (contractId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your storage service
      console.log(`Uploading signed document for contract ${contractId}:`, file);
      // For now, just show an alert
      alert(`Podepsaný dokument "${file.name}" byl úspěšně nahrán pro smlouvu ${contractId}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Aktivní</Badge>;
      case 'pending':
        return <Badge className="bg-orange-600">Čeká na podpis</Badge>;
      case 'completed':
        return <Badge className="bg-blue-600">Dokončeno</Badge>;
      case 'expired':
        return <Badge className="bg-gray-600">Vypršelo</Badge>;
      default:
        return <Badge variant="outline">Neznámý</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'insurance':
        return <Shield className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'course':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Kurz</Badge>;
      case 'insurance':
        return <Badge variant="outline" className="text-green-600 border-green-600">Pojištění</Badge>;
      default:
        return <Badge variant="outline">Ostatní</Badge>;
    }
  };

  const filterContracts = (status: string, type?: string) => {
    let filtered = contracts;
    
    if (status !== 'all') {
      filtered = filtered.filter(contract => contract.status === status);
    }
    
    if (type && type !== 'all') {
      filtered = filtered.filter(contract => contract.type === type);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(contract => 
        contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contract.courseName && contract.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const ContractCard = ({ contract }: { contract: typeof contracts[0] }) => (
    <Card key={contract.id} className="border-rust-800/30 hover:border-rust-600/50 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {getTypeIcon(contract.type)}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-rust-400 font-orbitron">{contract.id}</h3>
                {getStatusBadge(contract.status)}
                {getTypeBadge(contract.type)}
              </div>
              <p className="text-foreground font-medium mb-1">{contract.title}</p>
              {contract.courseName && (
                <p className="text-sm text-muted-foreground mb-2">Kurz: {contract.courseName}</p>
              )}
              <p className="text-sm text-muted-foreground mb-3">{contract.description}</p>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Podepsáno: {new Date(contract.signedDate).toLocaleDateString('cs-CZ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Platnost: {new Date(contract.validFrom).toLocaleDateString('cs-CZ')} - {new Date(contract.validTo).toLocaleDateString('cs-CZ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-rust-800/20">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            Zobrazit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Stáhnout PDF
          </Button>
          
          {contract.needsSignature && (
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(contract.id, e)}
                className="hidden"
                id={`upload-${contract.id}`}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => document.getElementById(`upload-${contract.id}`)?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Nahrát podepsaný dokument
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Smlouvy
        </h1>
        <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
          {contracts.length} smluv
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contracts.filter(c => c.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">Aktivní smlouvy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {contracts.filter(c => c.status === 'pending').length}
              </div>
              <p className="text-sm text-muted-foreground">Čeká na podpis</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {contracts.filter(c => c.status === 'completed').length}
              </div>
              <p className="text-sm text-muted-foreground">Dokončené</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat smlouvy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Všechny</TabsTrigger>
          <TabsTrigger value="active">Aktivní</TabsTrigger>
          <TabsTrigger value="pending">Čekající</TabsTrigger>
          <TabsTrigger value="completed">Dokončené</TabsTrigger>
          <TabsTrigger value="course">Kurzy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {filterContracts('all').map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          {filterContracts('active').map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4 mt-6">
          {filterContracts('pending').map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {filterContracts('completed').map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </TabsContent>
        
        <TabsContent value="course" className="space-y-4 mt-6">
          {filterContracts('all', 'course').map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientContracts;
