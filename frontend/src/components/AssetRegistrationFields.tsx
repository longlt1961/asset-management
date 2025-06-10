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
        name="assetName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Asset Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="assetType"
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
        name="serialNumber"
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
        name="purchaseDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Purchase Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="warrantyExpiryDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Warranty Expiry Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cost"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Cost</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select status" />
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

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="required-field">Location</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};