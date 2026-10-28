import { siteConfig } from '../data/siteConfig';
import { Modal } from './ui/Modal';
import { VideoPlayer } from './ui/VideoPlayer';

export function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { url, poster, duration, label } = siteConfig.showreel;
  return (
    <Modal open={open} onClose={onClose} labelledBy="showreel-modal-title" panelClassName="max-w-[1400px]">
      <VideoPlayer
        url={url}
        poster={poster}
        title={`${siteConfig.brand.name} ${label}`}
        autoPlay
        configPath="src/data/siteConfig.ts → showreel.url"
      />
      <div className="mt-4 flex items-center justify-between gap-4">
        <h2 id="showreel-modal-title" className="label text-fg">
          {siteConfig.brand.name} — {label}
        </h2>
        {duration && <span className="label tabular-nums">{duration}</span>}
      </div>
    </Modal>
  );
}
