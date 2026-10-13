
(async () => {
  const b64 = window.__b64Parts.join('');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const file = new File([bytes], 'transport-portal-rto-district-scope.zip', { type: 'application/zip' });
  const input = document.querySelector('#zipFile');
  if (!input) return { ok:false, err:'no input' };
  const dt = new DataTransfer();
  dt.items.add(file);
  input.files = dt.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await new Promise(r => setTimeout(r, 900));
  const btn = Array.from(document.querySelectorAll('button')).find(b => /Apply Update/i.test(b.textContent || ''));
  if (!btn || btn.disabled) return { ok:false, err:'btn', size: bytes.length, b64: b64.length };
  btn.click();
  return { ok:true, size: bytes.length, b64: b64.length };
})()
