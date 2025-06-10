import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface AssetFormFieldsProps {
  form: UseFormReturn<any>;
}

export const AssetFormFields = ({ form }: AssetFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="AssetType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Asset Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white" data-test="asset-type">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="Monitor">Monitor</SelectItem>
                <SelectItem value="Tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="SerialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Serial Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Model"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Model</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="DateOfPurchase"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Date of Purchase</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="VendorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Vendor Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Cost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cost</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="WarrantyExpiryDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Warranty Expiry Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Needs Repair">Needs Repair</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};