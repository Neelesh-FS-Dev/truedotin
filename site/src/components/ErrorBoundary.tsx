import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

// Keeps a failing route from blanking the whole site: the header and footer stay usable.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Route failed to render", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="page-intro" role="alert">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display display--md">This page could not load.</h1>
        <p className="lede">
          Try reloading the page, or go back to the <a className="text-link" href="/">homepage</a>.
        </p>
      </section>
    );
  }
}
