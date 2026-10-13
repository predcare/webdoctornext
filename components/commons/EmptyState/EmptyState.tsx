import NoFoundIcon from '@/components/ui/Icons/NoFoundIcon';
import { Box, styled, Typography, TypographyProps } from '@mui/material';

export const EmptyStateWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 350px);
  gap: 10px;
  text-align: center;
  padding: 24px;
  width: 100%;
  i {
    display: inline-flex;
  }
  .title {
    color: black;
    font-family: 'outfit';
  }
`;

interface IEmptyStateProps {
    text?: string;
    description?: string;
    textVariant?: TypographyProps['variant'];
}

const EmptyState = ({ text = 'Data', description, textVariant = 'h2' }: IEmptyStateProps) => {
    return (
        <EmptyStateWrap>
            <i>
                <NoFoundIcon IconHeight="50" IconWidth="50" />
            </i>
            <Box>
                <Typography variant={textVariant} className="title">
                    {text}
                </Typography>
                {description && (
                    <Typography variant="body2" className="desc">
                        {description}
                    </Typography>
                )}
            </Box>
        </EmptyStateWrap>
    );
};

export default EmptyState;