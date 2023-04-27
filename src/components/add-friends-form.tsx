interface Props {}
export const AddFriendsForm = (props: Props) => {
  return (
    <form>
      <input placeholder="email" />
      <button type="submit" className="bg-emerald-500">
        Send Request
      </button>
    </form>
  );
};
