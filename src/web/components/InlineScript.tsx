// A script that runs while the HTML is still being parsed, before the first paint.
// Hooks and effects run only after hydration, which is too late: the page would first paint in the wrong state.
const InlineScript = ({ code }: { code: string }) => <script dangerouslySetInnerHTML={{ __html: code }} />;

export default InlineScript;
