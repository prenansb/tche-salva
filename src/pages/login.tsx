import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Toaster, toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

export const loginFormSchema = () =>
	z.object({
		email: z.string().min(1, "Insira um email").email("Email inválido"),
		password: z.string().min(1, "Insira uma senha").min(8, "Senha inválida"),
	});

export type LoginFormValues = z.infer<ReturnType<typeof loginFormSchema>>;

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const { login, user } = useAuth();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema()),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	if (user) {
		navigate("/dashboard");
	}

	async function onSubmit(values: LoginFormValues) {
		try {
			const response = await login(values.email, values.password);

			navigate("/dashboard");
		} catch (e) {
			toast.error("Não foi possivel se conectar à plataforma.");
		}
	}

	return (
		<main className="w-screen h-screen">
			<div className="flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center p-4 lg:p-0">
				<Toaster richColors />

				<div className="w-full max-w-[450px] space-y-4">
					<div className="w-full space-y-2">
						<h1 className="text-3xl font-bold">Login</h1>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>

										<FormControl>
											<Input placeholder="email@dominio.com" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>

										<FormControl>
											<div className="flex space-x-2">
												<Input
													placeholder="*********"
													type={showPassword ? "text" : "password"}
													{...field}
												/>

												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																size="icon"
																variant="outline"
																onClick={() => setShowPassword((prev) => !prev)}
																type="button"
																data-testId="toggle-password"
															>
																{showPassword ? (
																	<Eye size={16} />
																) : (
																	<EyeOff size={16} />
																)}
															</Button>
														</TooltipTrigger>

														<TooltipContent>
															<p>{showPassword ? "Mostrar" : "Esconder"}</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end space-x-2">
								<Button type="submit">Acessar</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</main>
	);
};
