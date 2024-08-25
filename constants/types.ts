import { StaticImageData } from "next/image";
import { ReactNode } from "react";
interface SubLink {
  name: string;
}

interface SubLinkCategory {
  title: string;
  links: SubLink[];
}
export interface LinkItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to?: string;
  subLinks?: SubLinkCategory[];
}

export interface ToggleItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface ButtonProps {
  type?: "primary" | "secondary" | "dark";
  customClass?: string;
  onClick: () => void;
  children: React.ReactNode;
  borderRadius?: string;
  paddingX?: string;
  paddingY?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface AuthBoxProps {
  children: React.ReactNode;
}

export interface AddCardProps {
  cardName: string;
  player: string;
  team: string;
  set: string;
  year: string;
  additionalYear: string;
  priceHistory: string;
  class: string;
  state: string;
  value: string;
  grade: number | undefined | null;
  sportsType: string;
}
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  streetAddress: string;
  province: string;
  city: string;
  country: string;
  zipCode: string;
  billingStreetAddress: string;
  billingProvince: string;
  billingCity: string;
  billingCountry: string;
  billingZipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}
export interface SignupWizardProps {
  step: number;
  values: any; // Adjust type as needed based on form data
  errors: { [key: string]: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  handleSubmit: () => void;
  loading?: boolean;
}
export interface CreateAccountProps {
  handleSubmit: () => void;
  errors: { [key: string]: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  values: { [key: string]: string };
  loading?: boolean;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  details?: string[];
}

export interface BankingDetailsProps {
  prevStep: () => void;
  handleSubmit: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  values: { [key: string]: string };
}

export interface AddressProps {
  nextStep: () => void;
  prevStep: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => void;
  values: { [key: string]: string };
}
export interface StatisticCardProps {
  heading: string;
  Icon1?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  Icon2?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  firstTitle: string;
  firstValue: string | number;
  secondTitle: string;
  secondValue: string | number;
  loading?: boolean;
}

export interface ProgressCardProps {
  heading: string;
  progressData: CollectedByCardSummaryResponse | null;
  loading?: boolean;
}

export interface PercentageBarProps {
  percentage: number | string;
  textPosition?: "before" | "after";
}

export interface CardProps {
  imageSrc: string | StaticImageData;
  cardIcon: string;
  teamName: string;
  teamYear: string;
  name: string;
  info: string;
  mintStatus: string;
  mintIcon: React.ComponentType;
  price: string | null | number;
  isFullWidth?: boolean;
  isImageBorder?: boolean;
  isSidebar?: boolean;
  mintText?: string;
  cardNumber?: string;
  cardStatus?: string;
}
export interface FilterItem {
  text: string;
}
interface Value {
  label: string;
  value: string | number; // Since "value" can be either a string (e.g., "Ken Griffey, Jr|Ken Griffey, Jr") or a number (e.g., 2023, 2024)
}

export interface FilterType {
  name: string;
  label: string;
  values: Value[];
}
export interface FilterProps {
  filters: FilterType[];
  filterStates: Array<{ filterName: string; values: (string | number)[] }>;
  setFilterStates: React.Dispatch<
    React.SetStateAction<
      Array<{ filterName: string; values: (string | number)[] }>
    >
  >;
}

export interface CollapsibleProps {
  text: string;
  children: React.ReactNode;
  isSidebar?: boolean;
}

export interface AuthContextProps {
  user: any; // Replace `any` with actual user type
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  sportstype: any;
  loadingPercentage: number;
  lastCard: any;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginData {
  username: string;
  password: string;
}
export interface VerifyTokenResponse {
  isValid: boolean;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface MenuDropdownProps {
  subLinks: SubLinkCategory[];
}

export interface IconButtonProps {
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
  borderRadius?: string;
  paddingX?: string;
  backgroundColor: string;
  hoverColor: string;
  width?: string;
  onClick: () => void;
  color?: string;
}

export interface SelectBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  lineColor?: string;
  error?: string | undefined;
  required?: boolean;
  multiSelect?: boolean;
}

export interface DragAndDropProps {
  onFileSelect: (file: File | null) => void; // Callback for when a file is selected
  acceptedFormats?: string; // Formats allowed (e.g., 'image/png, image/jpeg')
  maxFileSizeMB: number; // Maximum file size in MB
  height?: string; // Height of the drop area
  borderColor?: string; // Border color of the drop area
  textColor?: string; // Text color inside the drop area
  selectedImage?: File | null; // The currently selected image file
  onRemoveImage?: () => void; // Callback for removing the selected image
  error?: string;
  id: string;
}

export interface CardDetailPlayer {
  id: string;
  sportstype: string;
  name: string;
  title: string;
  nickname: string;
  created_date: string;
  birth_date: string;
  death_date: string;
  listed_height: number;
  listed_weight: number;
  halloffame_induction_year: number;
  crawler_note: string;
  halloffame: number;
}

export interface CardDetail {
  id: number;
  created_date: string;
  sportstype: number;
  title: string;
  number: string;
  status: string;
  status_update_date: string;
  description: string;
  front_image: string;
  back_image: string;
  player: string;
  player_detail: CardDetailPlayer;
  cardset: string;
  average_sale_price: string;
}

export interface CollectedCardResult {
  id: number;
  created_date: string;
  grade: number;
  front_image: string;
  back_image: string;
  is_marked_as_sold: boolean;
  is_wanted: boolean;
  permalink: string;
  player_detail: any;
  generate_permalink_url: string;
  card: number;
  card_detail: CardDetail;
  created_by: string;
  average_sale_price: string | number | null;
}

export interface CollectedCardResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CollectedCardResult[];
}

export interface CollectedByCardSummaryResult {
  id: string;
  sportstype: string;
  title: string;
  created_date: string;
  created_by: number;
  collectedcard_count_distinct: number;
  collectedcard_count: number;
  card_count: number;
  collected_cards_url: string;
}

export interface CollectedByCardSummaryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CollectedByCardSummaryResult[];
}

export interface CollectedCardSummaryResponse {
  count: number;
  value: string;
}

export interface CollectedCardQueryParams {
  manufacturer?: string[];
  page?: number;
  page_size?: number;
  player?: string;
  q?: string;
  sportstype?: string[];
  year?: number[];
  ordering?: string;
}

export interface CollectedCardSummaryQueryParams {
  page?: number;
  page_size?: number;
  q?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface AutocompleteInputProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void; // Parent function to handle selected option
  fetchOptions: (query: string) => Promise<Option[]>; // API function to fetch options
  lineColor?: string;
  error?: string;
  type?: string;
  required?: boolean;
  value: string;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  minWidth?: string;
  maxWidth?: string;
  borderRadius?: string;
  children: ReactNode;
}

export interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lineColor?: string;
  error?: string | undefined;
  type?: string; // Optional type prop for different input types
  required?: boolean;
}

export interface FetchPlayerByQueryParams {
  q: string; // Required search query
  sportstype?: string; // Optional filter based on sportstype
  page?: number; // Optional pagination parameter
  page_size?: number; // Optional pagination parameter
}

export interface FetchCardsetByQueryParams {
  q: string; // Required search query
  sportstype?: string; // Optional filter based on sportstype
  page?: number; // Optional pagination parameter
  page_size?: number; // Optional pagination parameter
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: undefined | string;
}

export interface PlayerDetail {
  id: string;
  sportstype: string;
  name: string;
  title: string;
  nickname: string;
  created_date: string;
  birth_date: string;
  death_date: string;
  listed_height: number;
  listed_weight: number;
  halloffame_induction_year: number;
  crawler_note: string;
  halloffame: number;
}

export interface CardResult {
  id: number;
  created_date: string;
  sportstype: number;
  title: string;
  number: string;
  status: string;
  status_update_date: string;
  description: string;
  front_image?: string | null; // Marked as optional and nullable
  back_image?: string | null; // Marked as optional and nullable
  player: string;
  player_detail: PlayerDetail;
  cardset: string;
  average_sale_price: string;
}

export interface SearchBoxProps {
  onSearch: (query: string) => Promise<CardResult[]>;
  selectedData?: any; // ID of the selected card
  setSelectedData: React.Dispatch<React.SetStateAction<any>>; // Function to update selected card ID
  error?: string;
}
export type Grade = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1.5 | 1;
