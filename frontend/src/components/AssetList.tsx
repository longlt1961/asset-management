import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPlus, Edit, Trash2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AssetAssignment from "./AssetAssignment";
import { log } from "console";
import { ASSET_ENDPOINT } from "../config";

interface Asset {
  id: number;
  assetName: string;
  assetType: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  cost: number;
  status: string;
  location: string;
}

interface AssetListProps {
  searchQuery: string;
}

const AssetList = ({ searchQuery }: AssetListProps) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage] = useState(1);

  // Get user data from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.role === "Admin";

  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets", currentPage, user?.username, user?.role],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const response = await axios.get(ASSET_ENDPOINT, {
        params: {
          page: currentPage,
          limit: 10,
        },
        headers: {
          Username: user.username,
        }
      });

      console.log(response)
      
      return response.data || [];
    },
    enabled: !!user
  });

  const filteredAssets = assets?.filter((asset: Asset) => {
    const matchesSearch = asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    const matchesType = typeFilter === "all" || asset.assetType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a: Asset, b: Asset) => {
    return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
  });
  console.log("🚀 ~ filteredAssets ~ filteredAssets:", assets)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            readOnly
            className="pl-10 w-full bg-white"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
          <SelectTrigger className="w-[180px] bg-white filter-by-status">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Needs Repair">Needs Repair</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setTypeFilter} defaultValue={typeFilter}>
          <SelectTrigger className="w-[180px] bg-white filter-by-type" >
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Phone">Phone</SelectItem>
            <SelectItem value="Monitor">Monitor</SelectItem>
            <SelectItem value="Tablet">Tablet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-auto max-h-[calc(100vh-250px)]">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Warranty Expiry</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets?.map((asset: Asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.assetType}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.purchaseDate}</TableCell>
                  <TableCell>{asset.warrantyExpiryDate}</TableCell>
                  <TableCell>{asset.cost}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <AssetAssignment assetId={asset.id.toString()} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;