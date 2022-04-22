import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      400: '#24cf88',
      500: '#12c57a',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: 30,
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
          _focus: {
            ring: 2,
            ringColor: 'primary.500',
          }
        },
        outline: {
          borderColor: 'primary.500',
          color: 'primary.500',
          _focus: {
            ring: 2,
            ringColor: 'primary.500',
          }
        }
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: '"Poppins", sans-serif',
      }
    }
  }
})

export default theme;
