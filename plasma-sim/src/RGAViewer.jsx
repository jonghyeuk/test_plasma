export default function RGAViewer({ src }) {
  return (
    <iframe
      src={src}
      title="RGA"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}
