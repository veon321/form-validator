# Form Validator

This repository contains a dynamic, vanilla client-side form validation application built as part of the "100 HTML CSS JavaScript Projects for Beginners" course by Codesistency. The project demonstrates programmatic DOM manipulation, input sanitation, real-time visual feedback, and comprehensive validation logic.

## Links

- **Solution URL:** [https://github.com/veon321/form-validator](https://github.com/veon321/form-validator)
- **Live Site URL:** [https://veon321.github.io/form-validator/](https://veon321.github.io/form-validator/)
- **Course Resource:** [Codesistency - 100 HTML CSS JavaScript Projects](https://www.youtube.com/watch?v=bW58B6y81y8&t=30216s)

## Built with

- **Semantic HTML5 markup:** Structured using robust architectural elements to establish an accessible DOM hierarchy, utilizing dedicated containers for modular form group management and semantic `<small>` elements for contextual error messaging.
- **CSS Custom Properties (Variables):** Implemented an explicit design token system to maintain consistent active UI states. Color tokens manage error-critical (`#e74c3c`) and success-verified (`#2ecc71`) states across borders and validation indicators.
- **Flexbox Layout:** Utilized as the primary positioning engine to guarantee optimal element centering, uniform structural distribution within individual component cards, and fluid alignment of error signals.
- **Vanilla JavaScript (ES6+):** Engine behind the application's functional layer, employing modular abstraction principles to pass input element references into specialized validation routines.

## Features

- **Strict Required-Field Enforcement:** Intercepts the default `submit` event context via programmatic event binding to evaluate individual string length parameters using `.trim()` sanitation, preventing whitespace injection bypasses.
- **Dynamic Field-Name Formatting:** Features an internal parser to map raw DOM `id` attributes directly into capitalized, user-friendly communication strings (including explicit camelCase transformation for complex field scopes).
- **RegEx Character Sequence Evaluation:** Implements an atomic regular expression architecture (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) within an isolated utility layer to strictly validate syntax structures against RFC e-mail formatting guidelines.
- **Boundary Length Constraints:** Evaluates textual inputs against custom, range-bound integer constraints (`min`/`max` parameters) to procedurally enforce minimum account-name safety thresholds and maximum buffer safety ceilings.
- **Password Alignment Synchronizer:** Features a secondary-input verification pass that executes cross-field value comparison to dynamically match character tokens before triggering the application success state.
- **Automated State Reset Strategy:** Upon successful global resolution of all active input validation states, the program executes native form resetting alongside systemic DOM tree cleanup to purge transient visual modifier classes.
