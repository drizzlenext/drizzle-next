export function ComponentContent({ htmlContent }: { htmlContent: string }) {
  return <div className="docs" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
}
