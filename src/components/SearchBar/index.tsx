import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { logout } from '../../slice/authSlice';
import { FaSearch } from "react-icons/fa";
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store';
import axios from 'axios';
import { ResponseTracks, Track } from '../../types/tracks';

interface IProps {
  onSuccess: (tracks: Track[], text: string) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<IProps> = ({ onSuccess, onClearSearch }) => {
  const accessToken: string = useAppSelector((state) => state.auth.accessToken);
  const [text, setText] = useState<string>('');
  const [isClear, setIsClear] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response: ResponseTracks = await searchTrack(text, accessToken);

      const tracks: Track[] = response.tracks.items;
      onSuccess(tracks, text);
      setIsClear(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const handleClear: () => void = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <Box>
      <Flex as="form" gap={3} onSubmit={handleSubmit}>
        <Input
          placeholder="Search track..."
          required
          value={text}
          onChange={handleInput}
          data-testid="search-input"
        />
        <Button
          type="submit"
          data-testid="search-button"
          aria-label="search button"
          disabled={text.length === 0}
        >
          <FaSearch />
        </Button>
      </Flex>

      {!isClear && (
        <Button variant="link" onClick={handleClear} mt={1}>Clear search</Button>
      )}
    </Box>
  )
}

export default SearchBar;
