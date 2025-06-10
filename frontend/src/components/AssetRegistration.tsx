import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/components/ui/custom-toast";
import { DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AssetFormFields } from "./AssetRegistrationFields";
import { ASSET_ENDPOINT } from "../config";



// Schema to match Asset interface (except id)
const assetSchema = z.object({
  assetName: z.string().min(1, "Asset name is required"),
  assetType: z.string().min(1, "Asset type is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  warrantyExpiryDate: z.string().min(1, "Warranty expiry date is required"),
  cost: z.coerce.number().min(0, "Cost is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
});

type AssetFormType = z.infer<typeof assetSchema>;

const AssetRegistration = () => {
  const queryClient = useQueryClient();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const form = useForm<AssetFormType>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      assetName: "",
      assetType: "",
      serialNumber: "",
      purchaseDate: "",
      warrantyExpiryDate: "",
      cost: 0,
      status: "",
      location: "",
    },
  });

  const onSubmit = async (values: AssetFormType) => {
    try {
      await axios.post(`${ASSET_ENDPOINT}`, values, {
        headers: {
          Username: user?.username,
        },
      });
      showToast("Asset registered successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      form.reset();
    } catch (error) {
      showToast("Failed to register asset", "error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetFormFields form={form} />
        </div>

        <div className="flex justify-end space-x-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Register Asset</Button>
        </div>
      </form>
    </Form>
  );
};

export default AssetRegistration;
