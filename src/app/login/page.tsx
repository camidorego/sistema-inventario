"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showForgotModal, setShowForgotModal] = useState(false);
    const [usernameRecovery, setUsernameRecovery] = useState("");
    const [recoveryLoading, setRecoveryLoading] = useState(false);
    const [recoverySent, setRecoverySent] = useState(false);
    const maskedEmail = "*****@gmail.com";


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);


        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });


            if (!res.ok) {
                // intenta leer mensaje del body, si no viene usa statusText
                const data = await res.json().catch(() => ({ message: res.statusText }));
                throw new Error(data?.message || "Error en el inicio de sesión");
            }
            router.push("/inventario");
        } catch (err: any) {
            setError(err.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    }
    async function handleRecovery(e?: React.FormEvent) {
        e?.preventDefault();
        setRecoveryLoading(true);
        setRecoverySent(false);


        try {
            // Aquí podrías llamar a tu endpoint real: /api/auth/recover
            // await fetch('/api/auth/recover', { method: 'POST', body: JSON.stringify({ username: usernameRecovery }) })


            // Simulación con delay
            await new Promise((res) => setTimeout(res, 900));


            // Mostrar mensaje de éxito
            setRecoverySent(true);
        } catch (err) {
            // Manejo de error si el endpoint falla
            setRecoverySent(false);
            alert("Error al intentar recuperar la cuenta. Intenta nuevamente.");
        } finally {
            setRecoveryLoading(false);
        }
    }


    return (
        <>
            <div className="bg-white shadow rounded-lg p-8">
                <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h1>


                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium">
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md border px-3 py-2"
                        />
                    </div>


                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border px-3 py-2"
                        />
                    </div>


                    {error && <p className="text-sm text-red-600">{error}</p>}


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 rounded-md bg-[#20519e] text-white disabled:opacity-60"
                    >
                        {loading ? "Cargando..." : "Entrar"}
                    </button>


                    <div className="text-sm text-center mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowForgotModal(true);
                                setUsernameRecovery("");
                                setRecoverySent(false);
                            }}
                            className="underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </form>
            </div>
            {/* Modal de recuperación */}
            {showForgotModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-4">
                        {!recoverySent ? (
                            <form onSubmit={handleRecovery} className="space-y-4">
                                <h2 className="text-lg font-semibold">Recuperar contraseña</h2>


                                <p className="text-sm text-gray-600">
                                    Ingresa tu nombre de usuario para enviar un código de recuperación a tu correo.
                                </p>


                                <div>
                                    <label htmlFor="usernameRecovery" className="block text-sm font-medium">
                                        Nombre de usuario
                                    </label>
                                    <input
                                        id="usernameRecovery"
                                        name="usernameRecovery"
                                        value={usernameRecovery}
                                        onChange={(e) => setUsernameRecovery(e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border px-3 py-2"
                                    />
                                </div>


                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(false)}
                                        className="px-4 py-2 rounded-md border"
                                    >
                                        Cancelar
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={recoveryLoading}
                                        className="px-4 py-2 rounded-md bg-[#20519e] text-white disabled:opacity-60"
                                    >
                                        {recoveryLoading ? "Enviando..." : "Recuperar contraseña"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Código enviado</h2>
                                <p className="text-sm">
                                    Se ha enviado un código de recuperación a tu correo: <strong>{maskedEmail}</strong>.
                                </p>
                                <p className="text-sm text-gray-600">
                                    Si no lo ves, comunicate con administración para recuperar tu cuenta.
                                </p>


                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(false)}
                                        className="px-4 py-2 rounded-md bg-[#20519e] text-white"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}