import FormBtnWithWallet from "../../share/form-btn";

export default function FarmBtn({ isActive }: { isActive: boolean }) {
  return <FormBtnWithWallet isActive={isActive}>Farm it</FormBtnWithWallet>;
}
