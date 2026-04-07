import { setProjectAnnotations } from "@storybook/react";
import * as projectAnnotations from "./preview";

// This function sets up the Storybook project annotations (decorators, parameters, etc.)
// so that they are available during Vitest execution.
setProjectAnnotations(projectAnnotations);
