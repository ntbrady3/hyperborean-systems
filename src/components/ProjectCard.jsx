import OpenInNew from '@mui/icons-material/OpenInNew';

export const ProjectCard = ({ project }) => {
  return (
    <div
      key={project.id}
      className="group bg-zinc-900/10 backdrop-blur-md rounded-lg flex flex-col h-full relative border-2 border-primary/50"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '450px'
      }}
    >
      {/* Blueprint-style label overlay */}
      <div 
        className="w-full p-4 z-10"
        style={{
          backdropFilter: 'blur(2px)',
          position: 'relative'
        }}
      >
        <h3 
          className="text-xl font-electrolize tracking-wider"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            borderBottom: '1px dashed var(--primary)',
            paddingBottom: '4px'
          }}
        >
          {project.title}
        </h3>
        <p 
          className="text-xs font-roboto mt-1"
          style={{ 
            letterSpacing: '1px',
            color: 'var(--tertiary)'
          }}
        >
          PROJECT ID: {project.id} | SPEC: {project.category.toUpperCase()}
        </p>
      </div>
      <div 
        className="h-40 relative"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            filter: 'contrast(1.1) brightness(0.9)',
            position: 'relative',
            zIndex: '1'
          }}
        />
      </div>
      <div className="flex flex-col flex-1 relative" style={{ zIndex: '1' }}>
        <div className="p-6 flex flex-col flex-1" style={{ minHeight: '200px' }}>
          <div className="flex flex-wrap gap-2 mb-4 justify-center items-center">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-electrolize tracking-wide rounded border border-primary/50 bg-primary text-foreground"
                style={{
                  textTransform: 'uppercase'
                }}
              >
                {tag}
              </span>
            ))}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300 ml-2"
            >
              <OpenInNew fontSize="medium" />
            </a>
          </div>
          <p className="text-foreground text-sm mb-2 text-left font-roboto mb-4">
            {project.description}
          </p>
          <p 
            className="text-foreground text-4xl mt-auto font-barcode text-primary"
            style={{ 
              letterSpacing: '2px',
              position: 'relative',
              zIndex: '1'
            }}
          >
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }).replace(',', '').toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};