type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
