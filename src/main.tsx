import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "./queryClient";
import { routeTree } from "./routeTree.gen";
import "./index.css";

// Register Service Worker (production only — SW breaks Vite HMR in dev)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register(`${import.meta.env.BASE_URL}sw.js`)
			.catch((err) => {
				console.error("ServiceWorker registration failed: ", err);
			});
	});
}

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	basepath: import.meta.env.BASE_URL,
	defaultViewTransition: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
