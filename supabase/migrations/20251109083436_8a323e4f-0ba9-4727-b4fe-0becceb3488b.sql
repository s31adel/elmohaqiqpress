-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create policy for viewing media (public access)
CREATE POLICY "Media files are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

-- Create policy for uploading media (authors and above)
CREATE POLICY "Authors can upload media"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  (
    has_role(auth.uid(), 'author'::app_role) OR
    has_role(auth.uid(), 'editor'::app_role) OR
    has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Create policy for deleting media (editors and above)
CREATE POLICY "Editors can delete media"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'media' AND
  (
    has_role(auth.uid(), 'editor'::app_role) OR
    has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Update media table to track storage files
ALTER TABLE media
ADD COLUMN storage_path text,
ADD COLUMN alt_text text;

-- Create index for better performance
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_media_created_at ON media(created_at DESC);