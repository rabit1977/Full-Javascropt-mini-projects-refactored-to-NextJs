import Accordion from './components/Accordion';

export default function Home() {
  return (
    <div className='min-h-screen p-8 bg-gray-100'>
      <h2 className='text-3xl font-bold text-center mb-6'>Accordion Example</h2>
      <div className='space-y-4'>
        <Accordion
          title='Section 1'
          content='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
        <Accordion
          title='Section 2'
          content='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
        <Accordion
          title='Section 3'
          content='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
      </div>
    </div>
  );
}
