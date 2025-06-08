import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HeaderLabel from "@/components/common/HeaderLabel/HeaderLabel";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import { useLogin } from "./useLogin";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const Login = () => {
  const { form, onSubmit, userNameError, passwordError } = useLogin();

  return (
    <div className="bg-[url(@/assets/login.png)] bg-cover h-screen w-screen flex items-center justify-end">
      <div className="w-[37.75%] h-[30%] flex items-center justify-center relative flex-col">
        <HeaderLabel
          className=" text-white top-0 items-center justify-center "
          title={"เข้าสู่ระบบ"}
        />

        <Card className=" bg-white shadow-md rounded-md p-8 w-120 h-120">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อผู้ใช้ / อีเมล</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อผู้ใช้ / อีเมล" {...field} />
                        </FormControl>
                        <FormMessage />
                        {userNameError && (
                          <Label className="text-sm text-red-500">
                            ชื่อผู้ใช้ / อีเมลของคุณไม่ถูกต้อง
                          </Label>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รหัสผ่าน</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="รหัสผ่าน"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                        {passwordError && (
                          <Label className="text-sm text-red-500">
                            รหัสผ่านของคุณไม่ถูกต้อง
                          </Label>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </form>
              <ButtonCustom
                label={"เข้าสู่ระบบ"}
                className="mt-14"
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
