// app/signature/page.tsx
'use client'

import SignatureCanvas from 'react-signature-canvas'
import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function SignaturePage() {
  const sigRef = useRef<any>(null)
  const [imgUrl, setImgUrl] = useState('')

  const uploadSignature = async () => {
    if (!sigRef.current) return

    const base64 = sigRef.current.getTrimmedCanvas().toDataURL('image/png')
    const blob = await fetch(base64).then((res) => res.blob())

    const fileName = `signature-${Date.now()}.png`

    const { data, error } = await supabase.storage
      .from('signatures')
      .upload(`user/${fileName}`, blob, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      console.error('Upload error:', error.message)
      return
    }

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/signatures/user/${fileName}`
    setImgUrl(publicUrl)
  }

  const clear = () => sigRef.current?.clear()

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold"></h1>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 200,
          className: 'border rounded bg-white shadow',
        }}
      />

      <div className="space-x-2">
        <button onClick={uploadSignature} className="px-4 py-2 bg-blue-600 text-white rounded">
          Upload
        </button>
        <button onClick={clear} className="px-4 py-2 bg-gray-300 rounded">
          Clear
        </button>
      </div>

      {imgUrl && (
        <div>
          <p className="mt-4 font-medium">Uploaded Signature:</p>
          <img src={imgUrl} alt="Signature" className="border mt-2 w-[400px]" />
        </div>
      )}
    </div>
  )
}
