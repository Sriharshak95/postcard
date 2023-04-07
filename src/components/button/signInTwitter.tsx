const SignInTwitter: React.FC<{onClick:() => void}> = ({onClick}) => {
    return (
        <button className="bg-blue-500 text-[20px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center" onClick={onClick}>
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M23 3.00012C22.0424 3.67566 20.9821 4.19246 19.86 4.53012C19.2577 3.83762 18.4675 3.34784 17.587 3.12012C16.7066 2.89241 15.7762 2.93544 14.9054 3.24449C14.0345 3.55355 13.2617 4.11543 12.681 4.88112C12.1004 5.6468 11.7352 6.57644 11.62 7.55012V8.55012C10.2426 8.63102 8.89105 8.27333 7.716 7.53012C6.54094 6.78691 5.59145 5.68694 4.977 4.37712C4.977 4.37712 -0.523001 14.2101 8.166 17.2701C5.93867 18.564 3.38382 19.1377 0.789002 18.9371C9.475 22.4971 20.5 17.7301 20.5 7.97012C20.4991 7.69874 20.4484 7.42829 20.3482 7.16936C20.2481 6.91043 20.1002 6.66618 19.91 6.45012C20.9406 5.42013 21.6703 4.13719 22.04 2.75012C22.7823 2.95181 23.4872 3.35072 24 3.90012L23 3.00012Z" />
          </svg>
          Sign In
        </button>)
}

export default SignInTwitter;