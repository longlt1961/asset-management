import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ASSET_ENDPOINT } from "../config";

const assignmentSchema = z.object({
  assignedUser: z.string().min(1, "User is required"),
  assignedTeam: z.string().optional(), // Made team optional
});

interface AssetAssignmentProps {
  assetId: string;
}

const AssetAssignment = ({ assetId }: AssetAssignmentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      assignedUser: "",
      assignedTeam: "",
    },
  });

  // Get user data from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const onSubmit = async (values: z.infer<typeof assignmentSchema>) => {
    try {
      await axios.post(
        `${ASSET_ENDPOINT}`,
        {
          AssignedUser: values.assignedUser,
          id: assetId,
          AssignedTeam: values.assignedTeam,
        },
        {
          headers: {
            Username: user.username,
          },
        }
      );

      await queryClient.invalidateQueries({ queryKey: ["assets"] });

      toast({
        title: "Success",
        description: "Asset assigned successfully",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign asset",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="assignedUser"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required-field">Assign to User</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter user name" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTeam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Assign Asset</Button>
        </div>
      </form>
    </Form>
  );
};

export default AssetAssignment;
