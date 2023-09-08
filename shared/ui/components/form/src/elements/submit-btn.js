import { Button } from 'ui/components/buttons';

export default function SubmitBtn({ register, rules, error, children, ...props }) {
  return (
    <Button
      {...props}
      type='submit'>
      {children}
    </Button>
  );
}
